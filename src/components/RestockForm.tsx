import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";

export function RestockForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("productFromUrl");

  const utils = api.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = api.product.setStock.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      toast({
        title: "Success",
        description: "You have have updated the stock!",
      });
    },
  });
  const [data] = api.product.getAll.useSuspenseQuery();
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  useEffect(() => {
    if (!search) return;
    setSelectedProduct(search);
  }, [search]);

  const target = useMemo(() => {
    if (!selectedProduct) return null;
    const target = data.find((x) => x.id === parseInt(selectedProduct));
    if (!target) return;
    if (inputRef.current?.value) {
      inputRef.current.value = target?.quantity_in_stock.toString();
    }
    return target;
  }, [selectedProduct, data]);

  return (
    <CardHeader>
      <CardTitle>Restock Products</CardTitle>
      <CardDescription>Select an existing product and restock.</CardDescription>
      <div className="flex gap-2">
        <Select
          onValueChange={(e) => setSelectedProduct(e)}
          value={selectedProduct}
        >
          <SelectTrigger>
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            {data.map((product) => {
              return (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Input
          className="w-[160px]"
          type="number"
          defaultValue={0}
          ref={inputRef}
        />
        <Button
          disabled={!inputRef.current || !target || mutation.isPending}
          onClick={() =>
            mutation.mutate({
              id: target!.id,
              quantity: parseInt(inputRef.current!.value),
            })
          }
        >
          {mutation.isPending ? "Stocking..." : "Restock!"}
        </Button>
      </div>
    </CardHeader>
  );
}
