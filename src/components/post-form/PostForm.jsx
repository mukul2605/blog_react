import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    console.log("Full Redux State in PostForm:", useSelector((state) => state.auth)); // Debugging
    console.log("User Data from Redux:", userData.$id);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "") // Remove special characters
                .replace(/\s+/g, "-") // Replace spaces with dashes
                .replace(/-+/g, "-"); // Remove duplicate dashes
        }
        return "";
    }, []);

    const submit = async (data) => {
        try {
            // Validate slug
            if (!data.slug) {
                alert("Slug cannot be empty!");
                return;
            }

            if (post) {
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
                if (file && post?.featuredImage) {
                    await service.deleteFile(post.featuredImage);
                }
                const dpPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (dpPost) {
                    navigate(`/post/${dpPost.$id}`);
                } else {
                    console.error("Post update failed: No response from API.");
                }
            } else {
                if (!data.image || data.image.length === 0) {
                    alert("Please upload an image.");
                    return;
                }
                
                // Validate file
                const file = data.image[0];
                const maxSize = 10 * 1024 * 1024; // 10MB
                const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
                
                if (file.size > maxSize) {
                    alert("File size must be less than 10MB");
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    alert("Only PNG, JPG, JPEG, and GIF files are allowed");
                    return;
                }
                try {
                    const file = await service.uploadFile(data.image[0]);
                    if (file) {
                        data.featuredImage = file.$id;
                        const dpPost = await service.createPost({
                            ...data,
                            userId: userData?.$id, // Ensure userData exists
                        });
                        if (dpPost) {
                            navigate(`/post/${dpPost.$id}`);
                        } else {
                            console.error("Post creation failed: No response from API.");
                            alert("Failed to create post. Please try again.");
                        }
                    } else {
                        alert("File upload failed. Please try again.");
                    }
                } catch (uploadError) {
                    console.error("File upload error:", uploadError);
                    alert(`Upload failed: ${uploadError.message || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const currentSlug = getValues("slug");
                const transformedSlug = slugTransform(value.title || ""); // Ensure value.title is always a string

                if (!currentSlug || currentSlug === transformedSlug) {
                    setValue("slug", transformedSlug, { shouldValidate: true });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, getValues, setValue, slugTransform]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-600" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
