package com.shop.shop.dto.item;

import com.shop.shop.domain.item.Item;
import com.shop.shop.domain.item.ItemSellStatus;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

public class ItemFormDto {

    private Long id;

    @NotBlank(message = "상품명을 입력해주세요")
    private String itemName;

    @NotNull(message = "가격을 입력해주세요")
    private Integer price;

    @NotBlank(message = "상세 설명을 입력해주세요")
    private String itemDetail;

    @NotNull(message = "남은 재고를 입력해주세요")
    private Integer stock;

    private ItemSellStatus itemSellStatus;

    // 상품 수정 시 사용되는 변수들
    private List<ItemImgDto> itemImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    // DTO -> Entity
    public Item createItem() {
        return modelMapper.map(this, Item.class);
    }

    // Entity -> DTO
    public static ItemFormDto of(Item item) {
        return modelMapper.map(item, ItemFormDto.class);
    }

}
