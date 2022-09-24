package com.shop.shop.repository;

import com.shop.shop.domain.item.Item;
import com.shop.shop.dto.item.ItemSearchDto;
import com.shop.shop.dto.item.MainItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemRepositoryCustom {

    Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable);

    // @QueryProjection 을 이용하여 바로 Dto 반환
    Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable);
}
