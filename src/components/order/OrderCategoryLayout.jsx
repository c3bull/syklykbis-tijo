import { useUser } from '@auth0/nextjs-auth0';

import OrderCategoryLayoutActionButtons from "./OrderCategoryLayoutActionButtons";
import PricesSideButtons from "../prices/PricesSideButtons";
import { getProductsByCategory} from "../../data/allProducts";
import { imageUrl} from "../utils/Image";
import { ClassNames} from "../utils/UtilFunctions";


export function OrderCategoryLayout(props) {
    const {
        title,
        category,
        appendProductAmount,
        selectedProductsAmount,
        alt,
        classes,
        icon,
    } = props;

    const { user } = useUser();
    return (
        <>
            <PricesSideButtons />
            <section id={category}>
                <h2 className="flex items-center justify-center py-6 pt-16 text-center text-lg font-semibold uppercase">
                    {title}
                    <div className="pl-2">{icon}</div>
                </h2>
                <div
                    className={ClassNames(
                        'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mx-8',
                        classes
                    )}
                >
                    {getProductsByCategory(category).map((item) => {
                        return (
                            <div
                                className="flex h-auto w-auto flex-col items-center rounded border border-gray-400 from-transparent
              via-gray-200 to-transparent px-8 pt-10 text-center duration-150 ease-in-out hover:scale-105 hover:bg-gradient-to-t hover:bg-gradient-to-t hover:shadow-lg"
                                key={item.id}
                            >
                                <img
                                    src={imageUrl(`bottles/${item.bottle}.png`)}
                                    className="h-auto w-20"
                                    alt={alt}
                                />
                                <p className="mt-6 min-h-[40px] uppercase">{item.name}</p>

                                <OrderCategoryLayoutActionButtons
                                    appendProductAmount={appendProductAmount}
                                    selectedProductsAmount={selectedProductsAmount}
                                    item={item}
                                />
                                <div className="flex w-full items-center justify-center py-5">
                                    {user && (
                                        <div>
                                            <div className="flex justify-center">
                                                <p className="font-bold text-primary">
                                                    {item.price.toFixed(2)} zł
                                                </p>
                                                <p className="pl-2"> / butelka</p>
                                            </div>
                                            <div className="flex justify-center whitespace-nowrap">
                                                <p className="font-bold text-primary">
                                                    {(item.price * 24).toFixed(2)} zł
                                                </p>
                                                <p className="pl-2"> / skrzynka</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
