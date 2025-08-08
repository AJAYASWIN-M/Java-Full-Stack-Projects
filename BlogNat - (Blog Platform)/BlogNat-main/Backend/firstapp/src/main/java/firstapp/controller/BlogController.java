package firstapp.controller;


import firstapp.entity.Blog;
import firstapp.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.util.Map;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepo;
    
    @Autowired
    private Cloudinary cloudinary;


    private String getUserIdFromHeader(@RequestHeader("X-USER-ID") String userId) {
        return userId;
    }

    private String getUserNameFromHeader(@RequestHeader("X-USER-NAME") String userName) {
        return userName;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable String id) {
        return blogRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createBlog(@RequestParam("title") String title,
                                        @RequestParam("content") String content,
                                        @RequestParam(value = "image", required = false) MultipartFile image,
                                        @RequestHeader("X-USER-ID") String userId,
                                        @RequestHeader("X-USER-NAME") String userName) throws IOException {

        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            imageUrl = uploadResult.get("secure_url").toString();
        }

        Blog blog = new Blog(title, content, userId, userName);
        blog.setImageUrl(imageUrl); // assuming your Blog class has setImageUrl()

        return ResponseEntity.ok(blogRepo.save(blog));
    }



    
    
    
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable String id,
                                        @RequestBody Blog updatedBlog,
                                        @RequestHeader("X-USER-ID") String userId) {
        Optional<Blog> blogOpt = blogRepo.findById(id);
        if (blogOpt.isEmpty()) return ResponseEntity.notFound().build();

        Blog blog = blogOpt.get();
        if (!blog.getAuthorId().equals(userId))
            return ResponseEntity.status(403).body("You can only edit your own blog.");

        blog.setTitle(updatedBlog.getTitle());
        blog.setContent(updatedBlog.getContent());
        return ResponseEntity.ok(blogRepo.save(blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable String id,
                                        @RequestHeader("X-USER-ID") String userId) {
        Optional<Blog> blogOpt = blogRepo.findById(id);
        if (blogOpt.isEmpty()) return ResponseEntity.notFound().build();

        Blog blog = blogOpt.get();
        if (!blog.getAuthorId().equals(userId))
            return ResponseEntity.status(403).body("You can only delete your own blog.");

        blogRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeBlog(@PathVariable String id,
                                      @RequestHeader("X-USER-ID") String userId) {
        Optional<Blog> blogOpt = blogRepo.findById(id);
        if (blogOpt.isEmpty()) return ResponseEntity.notFound().build();

        Blog blog = blogOpt.get();

        if (blog.getAuthorId().equals(userId)) {
            return ResponseEntity.status(403).body("You can't like your own blog.");
        }

        if (!blog.getLikedBy().contains(userId)) {
            blog.getLikedBy().add(userId);
            blogRepo.save(blog);
        }

        return ResponseEntity.ok().build();
    }
}
