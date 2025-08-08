package firstapp.controller;

import firstapp.entity.User;
import firstapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User newUser) {
        Optional<User> existing = userRepo.findByEmail(newUser.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        return ResponseEntity.ok(userRepo.save(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(401).body("Invalid email or password.");
    }
}
