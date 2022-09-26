package com.shop.shop.service.member;

import com.shop.shop.domain.cart.CartItem;
import com.shop.shop.domain.item.Item;
import com.shop.shop.domain.member.Member;
import com.shop.shop.domain.order.Order;
import com.shop.shop.dto.item.ItemFormDto;
import com.shop.shop.dto.member.JoinFormDto;
import com.shop.shop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    // 회원가입
    public Member saveMember(Member member) {
        validateDuplicateMember(member);
        return memberRepository.save(member);
    }

    // 중복회원 검증
    public void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());

        if (findMember != null) {
            throw new IllegalStateException("이미 가입된 회원입니다");
        }
    }

    // 로그인 요청 검증을 위한 User 객체
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);

        if (member == null) {
            throw new UsernameNotFoundException(email);
        }

        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().toString())
                .build();
    }


//    // 회원수정
//    public Long updateMember(JoinFormDto joinFormDto){
//
//        // 수정
//        Member member = memberRepository.findById(joinFormDto.getId()).orElseThrow(EntityNotFoundException::new);
//        member.updateMember(joinFormDto, );
//        Item item = itemRepository.findById(itemFormDto.getId()).orElseThrow(EntityNotFoundException::new);
//        item.updateItem(itemFormDto);
//
//        // 이미지 수정
//        List<Long> itemImgIds = itemFormDto.getItemImgIds();
//        for (int i = 0; i < itemImgFileList.size(); i++) {
//            itemImgService.updateItemImg(itemImgIds.get(i), itemImgFileList.get(i));
//        }
//
//        return item.getId();
//    }

}
