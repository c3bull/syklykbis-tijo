import React, { useState } from 'react';

import { BottleModal} from "../modals/BottleModal";
import {getProductsByCategoryFetched} from "../../data/allProducts";
import { imageUrl} from "../utils/Image";
import { ClassNames} from "../utils/UtilFunctions";
import axios from "axios";
import {useEffect} from 'react';


function ProductsLayout({ categoryUrl, className, color }) {
    const [bottleIndex, setBottleIndex] = useState(-1);
    const [products, setProducts] = useState([])
    const getAllProductsByCategory = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/products/:category',
            data: {
                category: categoryUrl,
            }
        }).then((response) => {
            setProducts(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        categoryUrl && getAllProductsByCategory();
    }, []);

    function BottleDisplay({ bottle, name, index}) {
        return (
            <article>
                <div
                    className='flex cursor-pointer items-center justify-center p-3'
                    onClick={() => {
                        setBottleIndex(index);
                    }}
                >
                    <div
                        className={ClassNames(
                            'rounded from-transparent',
                            color,
                            'to-transparent duration-300 hover:bg-gradient-to-t flex flex-col items-center'
                        )}
                    >
                        <img
                            src={imageUrl(`bottles/${bottle}.png`)}
                            alt={name}
                            className='h-auto w-32 py-2 px-6 duration-300 hover:rotate-2 sm:w-44'
                        />
                        <p className='text-center font-medium uppercase'>{name}</p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <div className='flex h-auto items-center justify-center pt-16 pb-24 md:pt-24 lg:pt-36'>
            {bottleIndex !== -1 && (
                <BottleModal
                    data={products[bottleIndex]}
                    onClick={() => {
                        setBottleIndex(-1);
                    }}
                />
            )}
            <div
                className={ClassNames('grid grid-cols-1', className, 'gap-1 sm:gap-6')}
            >
                {getProductsByCategoryFetched(products, categoryUrl).map(({ id, bottle, name }, index) => (
                    <BottleDisplay id={id} bottle={bottle} name={name} key={id} index={index} />
                ))}
            </div>
        </div>
    );
}

export default ProductsLayout;
