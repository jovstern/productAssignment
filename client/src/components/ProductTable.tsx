import React, {useState} from "react";

const ProductTable = ({data}) => {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (uuid: string) => {
        setOpenGroups(prev => ({
            ...prev,
            [uuid]: !prev[uuid],
        }));
    };

    return (
        <table className="summary-table">
            <thead>
            <tr className="summary-header">
                <th>Reservation UUID</th>
                <th>Number of Active Purchases</th>
                <th>Sum of Active Charges</th>
            </tr>
            </thead>
            <tbody>
            {data.map(group => {
                const isOpen = !!openGroups[group.uuid];

                return (
                    <React.Fragment key={group.uuid}>
                        <tr
                            className="group-row clickable"
                            onClick={() => toggleGroup(group.uuid)}
                        >
                            <td>
                                {isOpen ? '˅' : '˃'} {group.uuid}
                            </td>
                            <td>{group.activeCount}</td>
                            <td>{group.activeSum}</td>
                        </tr>

                        {isOpen && group.products.length > 0 && (
                            <>
                                <tr className="product-header-row">
                                    <th>Product Name</th>
                                    <th>Status</th>
                                    <th>Charge</th>
                                </tr>
                                {group.products.map(product => (
                                    <tr
                                        key={product.id}
                                        className={`product-row ${
                                            product.active ? 'active' : 'cancelled'
                                        }`}
                                    >
                                        <td>{product.name}</td>
                                        <td>{product.active ? 'active' : 'cancelled'}</td>
                                        <td>{product.amount}</td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </React.Fragment>
                );
            })}
            </tbody>
        </table>
    )
};

export default ProductTable;