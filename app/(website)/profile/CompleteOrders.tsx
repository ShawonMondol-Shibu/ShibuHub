import { Card,  CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { CheckCircle2Icon } from 'lucide-react';
import React from 'react'

export default function CompleteOrders() {
  const data = [1, 2, 3];
  return (
    <main className="space-y-5 p-5 border rounded-lg" aria-label="Completed Orders Section">
  <Card className="bg-green-500 text-white">
    <CardHeader>
      <CardTitle>Completed Orders</CardTitle>
    </CardHeader>
  </Card>

  <div className="space-y-2">
    {data.length === 0 ? (
      <div className="text-center text-gray-500 py-10">
        <CheckCircle2Icon className="mx-auto mb-2 text-gray-300" />
        <p>No completed orders yet.</p>
      </div>
    ) : (
      data.map((item) => (
        <Item key={item} variant={'outline'}  className="bg-green-50 text-green-800 border border-green-200">
          <ItemMedia>
            <CheckCircle2Icon className="text-green-600" size={18} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Order #{item} is Completed</ItemTitle>
          </ItemContent>
        </Item>
      ))
    )}
  </div>
</main>

  );
}
