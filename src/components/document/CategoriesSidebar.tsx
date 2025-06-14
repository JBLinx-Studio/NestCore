
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, FileText, Image, Upload } from "lucide-react";

interface CategoriesSidebarProps {
  categories: Array<{ id: string; name: string; count: number }>;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  handleUpload: (file: File) => void;
}

export const CategoriesSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleUpload,
}: CategoriesSidebarProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-blue-600" />
            <span>Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-auto">
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Quick Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf';
            input.onchange = (e: any) => {
              const file = e.target.files[0];
              if (file) handleUpload(file);
            };
            input.click();
          }}>
            <FileText className="mr-2 h-4 w-4" />
            Lease Agreement
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            input.onchange = (e: any) => {
              Array.from(e.target.files).forEach((file: any) => handleUpload(file));
            };
            input.click();
          }}>
            <Image className="mr-2 h-4 w-4" />
            Property Photos
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf';
            input.onchange = (e: any) => {
              const file = e.target.files[0];
              if (file) handleUpload(file);
            };
            input.click();
          }}>
            <FileText className="mr-2 h-4 w-4" />
            Utility Bill
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.jpeg,.png';
            input.onchange = (e: any) => {
              const file = e.target.files[0];
              if (file) handleUpload(file);
            };
            input.click();
          }}>
            <FileText className="mr-2 h-4 w-4" />
            Expense Receipt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
