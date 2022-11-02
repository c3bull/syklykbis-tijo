import 'swiper/css';
import shuffle from 'lodash/shuffle';
import React, { useEffect, useState } from 'react';
import { Autoplay , Controller} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionHeader from "../common/SectionHeader";
import allProductsData from "../../data/allProducts";
import {imageUrl} from "../utils/Image";

export default function OurProductsSwiper({ goToProducts }) {
    const [allProducts, setAllProducts] = useState(allProductsData);

    useEffect(() => {
        setAllProducts(shuffle(allProductsData));
    }, []);

    return (
        <div className="m-0 flex justify-center">
            <div className="flex w-2/3 flex-col items-center pb-10">
                <SectionHeader
                    icon={<img
                        src={imageUrl('icons/IoWaterOutline.png')}
                        width='50px'
                        height='50px'
                        alt='nasze produkty'
                    />}>
                    Nasze Produkty
                </SectionHeader>
                <Swiper
                    className="max-h-[90vh] max-w-[100%]"
                    modules={[Controller]}
                    slidesPerView={8}
                    autoplay={{ delay: 1300 }}
                    loop={true}
                >
                    {allProducts.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <img
                                    src={imageUrl(`bottles/${item.bottle}.png`)}
                                    onClick={goToProducts}
                                    alt="butelka"
                                    className="cursor-pointer"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
