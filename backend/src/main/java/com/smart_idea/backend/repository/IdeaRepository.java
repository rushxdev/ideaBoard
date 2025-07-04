package com.smart_idea.backend.repository;

import com.smart_idea.backend.dao.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findAllByOrderByCreatedAtDesc();
}
