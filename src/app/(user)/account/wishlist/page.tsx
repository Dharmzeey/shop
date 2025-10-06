import { EmptyWishlist, WishlistCard } from "@/components/user/wishlistComponent";
import { listWishlist } from "@/services/userApis"
import { WishlistData } from "@/types/userInterfaces";
import { redirect } from "next/navigation";

export default async function Wishlist() {
    const response = await listWishlist();

    if (response.status === 401) {
        // Redirect to login if unauthorized
        redirect("/login?callbackUrl=/account/wishlist");
    }
    const wishlists: WishlistData[] = response.data
    return (
        <>
            {wishlists && wishlists.length >= 1 ? (
                <div className="product-grid">
                    {wishlists.map((wishlist) => (
                        <WishlistCard key={wishlist.product.id} wishlist={wishlist.product} />
                    ))}
                </div>
            ) : (
                <EmptyWishlist />
            )}
        </>
    )
}