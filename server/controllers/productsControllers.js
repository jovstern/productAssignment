import {productAssignment} from "../mocks/productAssignment.js";
import {productCharges} from "../mocks/productCharges.js";

// [
//     {
//         uuid: '12345',
//         activeProducts: 33,
//         activeSum: 40
//         products: [
//             {
//                 "id": 398555,
//                 "reservation_uuid": "622e142c-594d-4624-97ca-0e7c019ba4cc",
//                 "name": "Dinner"
//             },
//             {
//                 "id": 398556,
//                 "reservation_uuid": "622e142c-594d-4624-97ca-0e7c019ba4cc",
//                 "name": "Breakfast"
//             },
//             {
//                 "id": 398468,
//                 "reservation_uuid": "5b0d307d-0f4a-4b45-9596-b124f73d4d3d",
//                 "name": "Book Car Parking with Staycity"
//             },
//         ]
//     }
// ]

function groupByUUID(data) {
    const map = {};

    data.forEach(item => {
        const uuid = item.reservation_uuid;
        if (!map[uuid]) {
            map[uuid] = [];
        }
        map[uuid].push(item);
    });

    return Object.entries(map).map(([uuid, products]) => ({
        uuid,
        products
    }));
}

function combineDataFromCharges(groupedData, productCharges) {
    const chargesMap = {};

    productCharges.forEach(charge => {
        chargesMap[charge.special_product_assignment_id] = {
            active: charge.active,
            amount: charge.amount
        };
    });

    return groupedData.map(group => {
        let activeProductsCounter = 0;
        let activeSumCounter = 0;

        const updatedProduct = group.products.map((product) => {
            const charge = chargesMap[product.id];

            const active = charge?.active ?? false;
            const amount = charge?.amount ?? 0;

            if (active) activeProductsCounter += 1;
            activeSumCounter += amount;

            return {
                ...product,
                ...charge,
            }
        })

        return {
            uuid: group.uuid,
            activeProducts: activeProductsCounter,
            activeSum: activeSumCounter,
            products: updatedProduct,
        }
    });
};

export const productControllersGet = (req, res) => {
    const grouped = groupByUUID(productAssignment);
    const enriched = combineDataFromCharges(grouped, productCharges);

    res.json(enriched);
};
