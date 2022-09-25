package com.shop.shop.repository;

import com.shop.shop.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);
//    Member findById(String id);

}
