package com.smart_idea.backend.service;

import com.smart_idea.backend.dao.Idea;
import com.smart_idea.backend.dto.IdeaDTO;
import com.smart_idea.backend.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdeaService {

    @Autowired
    private IdeaRepository ideaRepository;

    public Idea saveIdea(IdeaDTO noteDto){
        Idea idea = new Idea();
        idea.setTitle(noteDto.getTitle());
        idea.setDescription(noteDto.getDescription());
        return ideaRepository.save(idea);
    }

    public List<Idea> getAllIdeasSortedByCreatedAtDesc() {
        return ideaRepository.findAllByOrderByCreatedAtDesc();
    }

    public Idea updateIdea(Long id, IdeaDTO ideaDTO) {
        Idea existingIdea = ideaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idea not found with id: " + id));
        existingIdea.setTitle(ideaDTO.getTitle());
        existingIdea.setDescription(ideaDTO.getDescription());
        return ideaRepository.save(existingIdea);
    }

    public void deleteIdea(Long id) {
        if(!ideaRepository.existsById(id)) {
            throw new RuntimeException("Idea not found with id: " + id);
        }
        ideaRepository.deleteById(id);
    }
}
