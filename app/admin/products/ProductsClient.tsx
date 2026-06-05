"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X,
  Loader2 
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "@/app/actions/adminActions";
import toast from "react-hot-toast";

interface ProductsClientProps {
  products: any[];
  collections: any[];
}

export function ProductsClient({ products, collections }: ProductsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("100");
  const [scent, setScent] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [selectedImage, setSelectedImage] = useState("/images/floral_candle.png");
  const [customImage, setCustomImage] = useState("");
  const [sizes, setSizes] = useState<string[]>(["200ml"]);
  const [burnTime, setBurnTime] = useState("45-50 hours");
  const [ingredients, setIngredients] = useState("100% natural soy wax, premium botanical oils, cotton wick.");
  const [howToUse, setHowToUse] = useState("Trim wick to 5mm before every burn. Burn for 2-3 hours at a time.");
  const [featured, setFeatured] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [isNew, setIsNew] = useState(true);

  // Preset images
  const presetImages = [
    { label: "Floral Candle", value: "/images/floral_candle.png" },
    { label: "Dark & Moody Candle", value: "/images/dark_moody_candle.png" },
    { label: "Fresh & Clean Candle", value: "/images/fresh_clean_candle.png" },
    { label: "Warm & Cosy Candle", value: "/images/warm_cosy_candle.png" },
    { label: "Custom URL", value: "custom" },
  ];

  const sizeOptions = ["100ml", "200ml", "300ml"];

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setPrice("");
    setComparePrice("");
    setStock("100");
    setScent("");
    setCollectionId(collections[0]?.id || "");
    setSelectedImage("/images/floral_candle.png");
    setCustomImage("");
    setSizes(["200ml"]);
    setBurnTime("45-50 hours");
    setIngredients("100% natural soy wax, premium botanical oils, cotton wick.");
    setHowToUse("Trim wick to 5mm before every burn. Burn for 2-3 hours at a time.");
    setFeatured(false);
    setBestseller(false);
    setIsNew(true);
    setIsFormOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setComparePrice(product.comparePrice ? product.comparePrice.toString() : "");
    setStock(product.stock.toString());
    setScent(product.scent);
    setCollectionId(product.collectionId || "");
    
    const isPreset = presetImages.some(img => img.value === product.images[0]);
    if (isPreset) {
      setSelectedImage(product.images[0]);
      setCustomImage("");
    } else {
      setSelectedImage("custom");
      setCustomImage(product.images[0] || "");
    }

    setSizes(product.size || ["200ml"]);
    setBurnTime(product.burnTime);
    setIngredients(product.ingredients);
    setHowToUse(product.howToUse);
    setFeatured(product.featured);
    setBestseller(product.bestseller);
    setIsNew(product.isNew);
    setIsFormOpen(true);
  };

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      if (sizes.length > 1) {
        setSizes(sizes.filter(s => s !== size));
      } else {
        toast.error("Products must have at least one size.");
      }
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the product "${name}"?`)) return;

    startTransition(async () => {
      try {
        const result = await deleteProduct(id);
        if (result.success) {
          toast.success("Product deleted successfully");
          router.refresh();
        } else {
          toast.error("Failed to delete product");
        }
      } catch (err) {
        toast.error("Failed to delete product");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    const imageUrl = selectedImage === "custom" ? customImage : selectedImage;
    if (!imageUrl) {
      toast.error("Please provide a product image.");
      return;
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : null,
      scent,
      images: [imageUrl],
      size: sizes,
      burnTime,
      ingredients,
      howToUse,
      stock: parseInt(stock),
      featured,
      bestseller,
      isNew,
      collectionId: collectionId || null,
    };

    startTransition(async () => {
      try {
        let result;
        if (editingProduct) {
          result = await updateProduct(editingProduct.id, payload);
        } else {
          result = await createProduct(payload);
        }

        if (result.success) {
          toast.success(editingProduct ? "Product updated successfully" : "Product created successfully");
          setIsFormOpen(false);
          router.refresh();
        } else {
          toast.error("Failed to save product details");
        }
      } catch (err) {
        toast.error("An error occurred while saving the product");
      }
    });
  };

  // Filter products locally
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.scent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollection = 
      selectedCollection === "all" || 
      product.collectionId === selectedCollection;

    return matchesSearch && matchesCollection;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-charcoal">Products</h1>
          <p className="text-sm text-warm-gray mt-1">Manage, update, and publish candle listings</p>
        </div>
        <Button 
          variant="primary" 
          onClick={openAddModal}
          className="flex items-center gap-2 h-11 uppercase tracking-wider text-xs px-6"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray/60" />
          <Input
            type="text"
            placeholder="Search by name or scent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 bg-transparent border-warm-gray/30 focus:border-gold"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider whitespace-nowrap">Collection:</span>
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="h-10 border border-warm-gray/30 bg-transparent px-3 rounded-none focus:outline-none focus:ring-1 focus:ring-gold text-sm w-full md:w-48"
          >
            <option value="all">All Collections</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table (inspired by shadcn DataTable) */}
      <div className="bg-white border border-warm-gray/20 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-warm-gray/20 bg-cream/40 text-xs font-semibold uppercase tracking-wider text-warm-gray/80">
              <th className="p-4 w-16">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Scent Profile</th>
              <th className="p-4">Price</th>
              <th className="p-4 w-24">Stock</th>
              <th className="p-4">Collection</th>
              <th className="p-4 w-24 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-gray/10 text-sm text-charcoal">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-warm-gray">
                  No products found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const colName = collections.find(c => c.id === product.collectionId)?.name || "Unassigned";
                return (
                  <tr key={product.id} className="hover:bg-cream/20 transition-colors">
                    <td className="p-4">
                      <div className="relative w-10 h-12 bg-blush border border-warm-gray/10">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium font-heading text-base">{product.name}</td>
                    <td className="p-4 text-xs text-warm-gray">{product.scent}</td>
                    <td className="p-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        product.stock > 10 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium">{colName}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-warm-gray hover:text-charcoal hover:bg-blush/30 rounded-md transition-colors"
                          aria-label="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isPending}
                          className="p-2 text-warm-gray hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          aria-label="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} className="max-w-2xl rounded-lg">
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-charcoal">
              {editingProduct ? `Edit Candle: ${editingProduct.name}` : "Create New Luxury Candle"}
            </h2>
            <p className="text-xs text-warm-gray mt-1">Provide artisan candle details below</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Candle Name</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Amber Moss"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              {/* Scent Strings */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Scent Notes (Short Summary)</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Sandalwood, Moss, Amber"
                  value={scent}
                  onChange={(e) => setScent(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Price (£)</label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  placeholder="45.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              {/* Compare Price */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Compare Price (£ - Optional)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Original price before discount"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Initial Stock</label>
                <Input
                  type="number"
                  required
                  placeholder="100"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              {/* Collection Select */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Collection</label>
                <select
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  className="h-10 border border-warm-gray/30 bg-white px-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm w-full"
                >
                  <option value="">Unassigned</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Artisan Description</label>
              <textarea
                required
                rows={3}
                placeholder="A rich storytelling description for the candle listing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-warm-gray/30 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-warm-gray/10 pt-4">
              {/* Image Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Candle Image Asset</label>
                <select
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  className="h-10 border border-warm-gray/30 bg-white px-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm w-full"
                >
                  {presetImages.map(img => (
                    <option key={img.value} value={img.value}>{img.label}</option>
                  ))}
                </select>

                {selectedImage === "custom" && (
                  <Input
                    type="text"
                    required
                    placeholder="Enter custom image URL (e.g. /images/custom.png)"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    className="bg-white border-warm-gray/30 h-10 mt-1"
                  />
                )}
              </div>

              {/* Sizes Multi-select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Available Sizes</label>
                <div className="flex gap-4 items-center h-10 px-1">
                  {sizeOptions.map(size => {
                    const isChecked = sizes.includes(size);
                    return (
                      <label key={size} className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSizeToggle(size)}
                          className="w-4 h-4 accent-gold"
                        />
                        {size}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Tabs Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-warm-gray/10 pt-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Burn Time (Details Tab)</label>
                <Input
                  type="text"
                  value={burnTime}
                  onChange={(e) => setBurnTime(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Ingredients (Details Tab)</label>
                <Input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="bg-white border-warm-gray/30 h-10"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">How to Use (Details Tab)</label>
                <textarea
                  rows={2}
                  value={howToUse}
                  onChange={(e) => setHowToUse(e.target.value)}
                  className="w-full border border-warm-gray/30 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            {/* Badges / Checkboxes */}
            <div className="flex flex-wrap gap-6 border-t border-warm-gray/10 pt-4">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                Featured Listing
              </label>

              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={(e) => setBestseller(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                Mark Bestseller
              </label>

              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                Mark as "New Arrival"
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-warm-gray/10 pt-4 mt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2 border border-warm-gray text-warm-gray hover:bg-blush/35 text-xs uppercase tracking-wider transition-colors h-11"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                className="h-11 px-8 text-xs uppercase tracking-wider flex items-center gap-2"
                isLoading={isPending}
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingProduct ? "Save Changes" : "Create Product"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
