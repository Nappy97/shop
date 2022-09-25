package com.shop.shop.dto.member;

import com.shop.shop.domain.item.Item;
import com.shop.shop.dto.item.ItemFormDto;
import com.shop.shop.dto.item.ItemImgDto;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class JoinFormDto {

//    private Long id;

    @NotBlank(message = "이름은 필수 입력해주세요")
    private String name;

    @NotBlank(message = "이메일은 필수 입력 값입니다")
    @Email(message = "이메일 형식으로 입력해주세요")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Length(min = 8, max = 16, message = "8자 이상, 16자 이하로 입력해주세요")
    private String password;

    @NotBlank(message = "주소는 필수 입력 값입니다")
    private String address;

}
