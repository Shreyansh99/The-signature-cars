"use client";

import AddCarForm from "@/components/sections/AddCarForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddCarPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Add a New Car</CardTitle>
          <CardDescription>
            Fill in the details below to add a new car to our inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddCarForm />
        </CardContent>
      </Card>
    </div>
  );
}
