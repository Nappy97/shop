package com.shop.shop.domain.member;

import com.shop.shop.domain.BaseEntity;
import com.shop.shop.dto.member.JoinFormDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member extends BaseEntity {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    private String name;

    private String address;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public static Member createMember(JoinFormDto joinFormDto, PasswordEncoder passwordEncoder) {
        Member member = new Member();
        member.setName(joinFormDto.getName());
        member.setEmail(joinFormDto.getEmail());
        member.setAddress(joinFormDto.getEmail());
        String password = passwordEncoder.encode(joinFormDto.getPassword());
        member.setPassword(password);
        member.setRole(Role.USER);
        return member;
    }

//    // 회원수정
//    public void updateMember(JoinFormDto joinFormDto, PasswordEncoder passwordEncoder){
//        this.name = joinFormDto.getName();
//        String password = passwordEncoder.encode(joinFormDto.getPassword());
//        this.password = joinFormDto.getPassword();
//        this.address = joinFormDto.getAddress();
//    }
}
