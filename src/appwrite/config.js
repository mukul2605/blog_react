import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

        // Debug configuration
        console.log('=== Appwrite Configuration Debug ===');
        console.log('URL:', `"${conf.appwriteUrl}"`);
        console.log('Project ID:', `"${conf.appwriteProjectId}"`);
        console.log('Database ID:', `"${conf.appwriteDatabaseId}"`);
        console.log('Collection ID:', `"${conf.appwriteCollectionId}"`);
        console.log('Bucket ID:', `"${conf.appwriteBucketId}"`);
        console.log('Bucket ID length:', conf.appwriteBucketId?.length);
        console.log('Bucket ID type:', typeof conf.appwriteBucketId);
        console.log('=====================================');
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) { // Changed userID to userId
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId // Ensure userId matches Appwrite's field name
                }
            )
        } catch (error) {
            throw error;
        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    // file services

    async uploadFile(file) {
        try {
            console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
            console.log('Bucket ID:', conf.appwriteBucketId);

            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                ['read("any")'] // Set file-level permissions for public read
            );

            console.log('Upload successful:', result);
            return result;
        } catch (error) {
            console.error('Upload failed:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                type: error.type
            });
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            console.log('Getting file view (no transformations) for file ID:', fileId);
            console.log('Using bucket ID:', conf.appwriteBucketId);
            
            // Use getFileView instead of getFilePreview to avoid transformation limits
            const url = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log('Generated file view URL object:', url);
            console.log('Generated file view URL string:', url?.href || url?.toString() || url);
            
            // Return the URL string, not the URL object
            return url?.href || url?.toString() || url;
        } catch (error) {
            console.error('Error generating file view:', error);
            // Fallback to download URL
            return this.getFileDownload(fileId);
        }
    }

    // Alternative method to get file view (direct download)
    getFileView(fileId) {
        try {
            console.log('Generating view for file ID:', fileId);
            
            const url = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log('Generated view URL object:', url);
            console.log('Generated view URL string:', url?.href || url?.toString() || url);
            
            return url?.href || url?.toString() || url;
        } catch (error) {
            console.error('Error generating file view:', error);
            return null;
        }
    }

    // Get file download URL (works even with restricted permissions for the owner)
    getFileDownload(fileId) {
        try {
            console.log('Generating download for file ID:', fileId);
            
            const url = this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log('Generated download URL object:', url);
            console.log('Generated download URL string:', url?.href || url?.toString() || url);
            
            return url?.href || url?.toString() || url;
        } catch (error) {
            console.error('Error generating file download:', error);
            return null;
        }
    }

    // Debug method to list available buckets
    async listBuckets() {
        try {
            console.log('Attempting to list buckets...');
            const buckets = await this.bucket.listBuckets();
            console.log('Available buckets:', buckets);
            console.log('Number of buckets found:', buckets.buckets?.length || 0);
            
            if (buckets.buckets && buckets.buckets.length > 0) {
                buckets.buckets.forEach((bucket, index) => {
                    console.log(`Bucket ${index + 1}:`, {
                        id: bucket.$id,
                        name: bucket.name,
                        enabled: bucket.enabled
                    });
                });
            }
            
            return buckets;
        } catch (error) {
            console.error('Error listing buckets:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                type: error.type
            });
            return null;
        }
    }

    // Test bucket access
    async testBucketAccess() {
        try {
            console.log('Testing bucket access with ID:', conf.appwriteBucketId);
            const files = await this.bucket.listFiles(conf.appwriteBucketId);
            console.log('Bucket access successful! Files:', files);
            return files;
        } catch (error) {
            console.error('Bucket access failed:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                type: error.type
            });
            return null;
        }
    }

    // Verify project and client setup
    async verifySetup() {
        try {
            console.log('=== Verifying Appwrite Setup ===');
            
            // Test client connection
            console.log('Client endpoint:', this.client.config.endpoint);
            console.log('Client project:', this.client.config.project);
            
            // List buckets to verify project access
            const buckets = await this.listBuckets();
            
            // Test specific bucket
            const bucketTest = await this.testBucketAccess();
            
            console.log('Setup verification complete');
            return { buckets, bucketTest };
        } catch (error) {
            console.error('Setup verification failed:', error);
            return null;
        }
    }

    // Get file info for debugging
    async getFileInfo(fileId) {
        try {
            console.log('Getting file info for ID:', fileId);
            const file = await this.bucket.getFile(conf.appwriteBucketId, fileId);
            console.log('File info:', file);
            return file;
        } catch (error) {
            console.error('Error getting file info for ID:', fileId);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                type: error.type
            });
            return null;
        }
    }

    // Debug posts and their featured images
    async debugPostImages() {
        try {
            console.log('=== Debugging Post Images ===');
            const posts = await this.getPosts([]);
            
            if (posts && posts.documents) {
                console.log('Found posts:', posts.documents.length);
                
                for (const post of posts.documents) {
                    console.log(`Post: ${post.title}`);
                    console.log(`Featured Image ID: ${post.featuredImage}`);
                    
                    if (post.featuredImage) {
                        const fileInfo = await this.getFileInfo(post.featuredImage);
                        console.log('File exists:', !!fileInfo);
                    }
                }
            }
            
            return posts;
        } catch (error) {
            console.error('Error debugging post images:', error);
            return null;
        }
    }

    // Fix permissions for existing files
    async fixFilePermissions(fileId) {
        try {
            console.log('Fixing permissions for file:', fileId);
            
            // Update file permissions to allow public read
            const result = await this.bucket.updateFile(
                conf.appwriteBucketId,
                fileId,
                undefined, // name (keep current)
                ['read("any")'] // permissions
            );
            
            console.log('Permissions updated for file:', fileId);
            return result;
        } catch (error) {
            console.error('Error fixing file permissions:', error);
            return null;
        }
    }

    // Fix all existing post image permissions
    async fixAllImagePermissions() {
        try {
            console.log('=== Fixing All Image Permissions ===');
            const posts = await this.getPosts([]);
            
            if (posts && posts.documents) {
                for (const post of posts.documents) {
                    if (post.featuredImage) {
                        await this.fixFilePermissions(post.featuredImage);
                    }
                }
            }
            
            console.log('All image permissions fixed!');
            return true;
        } catch (error) {
            console.error('Error fixing all image permissions:', error);
            return false;
        }
    }

    // Manual URL construction for free plan
    getFileURL(fileId, type = 'view') {
        const baseUrl = conf.appwriteUrl;
        const projectId = conf.appwriteProjectId;
        const bucketId = conf.appwriteBucketId;
        
        const url = `${baseUrl}/storage/buckets/${bucketId}/files/${fileId}/${type}`;
        console.log('Manual URL constructed:', url);
        return url;
    }
}

const service = new Service();
export default service