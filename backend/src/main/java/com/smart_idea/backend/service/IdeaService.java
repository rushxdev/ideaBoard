package com.smart_idea.backend.service;

import com.smart_idea.backend.dao.Idea;
import com.smart_idea.backend.dto.IdeaDTO;
import com.smart_idea.backend.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdeaService {
    private IdeaRepository ideaRepository;

    @Autowired
    public IdeaService(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    public Idea saveIdea(IdeaDTO noteDto){
        Idea idea = new Idea();
        idea.setTitle(noteDto.getTitle());
        idea.setDescription(noteDto.getDescription());
        return ideaRepository.save(idea);
    }

    public Iterable<Idea> getAllIdeas() {
        return ideaRepository.findAll();
    }
}
