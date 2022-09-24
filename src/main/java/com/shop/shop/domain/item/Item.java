package com.shop.shop.domain.item;

import com.shop.shop.domain.BaseEntity;
import com.shop.shop.dto.item.ItemFormDto;
import com.shop.shop.exception.OutOfStockException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String itemName;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int stock;    // 재고

    @Lob
    @Column(nullable = false)
    private String itemDetail;

    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus;  // 판매여부

    public void updateItem(ItemFormDto itemFormDto){
        this.itemName = itemFormDto.getItemName();
        this.price = itemFormDto.getPrice();
        this.stock = itemFormDto.getStock();
        this.itemDetail = itemFormDto.getItemDetail();
        this.itemSellStatus = itemFormDto.getItemSellStatus();
    }

    public void removeStock(int stock){
        int restStock = this.stock - stock;
        if (restStock < 0){
            throw new OutOfStockException("재고가 부족해요! (현재 재고 수량: " + this.stock + ")");
        }
        this.stock = restStock;
    }

    public void addStock(int stock){
        this.stock += stock;
    }

}
