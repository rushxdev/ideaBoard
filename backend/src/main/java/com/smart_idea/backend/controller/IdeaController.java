package com.smart_idea.backend.controller;

import com.smart_idea.backend.dao.Idea;
import com.smart_idea.backend.dto.IdeaDTO;
import com.smart_idea.backend.service.IdeaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin(origins = "http://localhost:5173")
public class IdeaController {

    @Autowired
    private IdeaService ideaService;

    @PostMapping
    public ResponseEntity<?> createIdea(@Valid @RequestBody IdeaDTO ideaDTO, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for(FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Idea idea = ideaService.saveIdea(ideaDTO);
        return new ResponseEntity<>(idea, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Idea>> getAllIdeas() {
        List<Idea> ideas = ideaService.getAllIdeasSortedByCreatedAtDesc();
        return new ResponseEntity<>(ideas, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable Long id,
                                           @Valid @RequestBody IdeaDTO ideaDTO,
                                           BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for(FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Idea updatedIdea = ideaService.updateIdea(id, ideaDTO);
        return new ResponseEntity<>(updatedIdea, HttpStatus.OK);
    }


}
