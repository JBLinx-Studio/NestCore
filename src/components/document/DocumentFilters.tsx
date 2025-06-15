
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  SortAsc,
  SortDesc
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Document } from "./types";

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onFiltersChange: (filters: any) => void;
  documents: Document[];
}

export const DocumentFilters = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onFiltersChange,
  documents
}: DocumentFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedTenant, setSelectedTenant] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("uploadDate");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  // Extract unique values for filter options
  const uniqueStatuses = [...new Set(documents.map(doc => doc.status))];
  const uniqueProperties = [...new Set(documents.map(doc => doc.property))];
  const uniqueTenants = [...new Set(documents.map(doc => doc.tenant).filter(t => t !== "N/A"))];
  const allTags = [...new Set(documents.flatMap(doc => doc.tags || []))];

  const applyFilters = () => {
    const filters = {
      dateFrom,
      dateTo,
      status: selectedStatus === "all" ? "" : selectedStatus,
      property: selectedProperty === "all" ? "" : selectedProperty,
      tenant: selectedTenant === "all" ? "" : selectedTenant,
      tags: selectedTags,
      sortBy,
      sortOrder
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedStatus("all");
    setSelectedProperty("all");
    setSelectedTenant("all");
    setSelectedTags([]);
    setSortBy("uploadDate");
    setSortOrder("desc");
    onSearchChange("");
    onCategoryChange("all");
    onFiltersChange({
      sortBy: "uploadDate",
      sortOrder: "desc"
    });
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    applyFilters();
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
  };

  const activeFiltersCount = [
    dateFrom,
    dateTo,
    selectedStatus !== "all",
    selectedProperty !== "all",
    selectedTenant !== "all",
    selectedTags.length > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Basic Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents, properties, tenants, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="uploadDate">Upload Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newOrder = sortOrder === "asc" ? "desc" : "asc";
              setSortOrder(newOrder);
              applyFilters();
            }}
          >
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={cn(
              "relative",
              activeFiltersCount > 0 && "border-blue-500 text-blue-600"
            )}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Date Range</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "MMM dd") : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "MMM dd") : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All statuses</SelectItem>
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Property</label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All properties" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All properties</SelectItem>
                    {uniqueProperties.map(property => (
                      <SelectItem key={property} value={property}>
                        {property}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenant Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tenant</label>
                <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                  <SelectTrigger>
                    <SelectValue placeholder="All tenants" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All tenants</SelectItem>
                    {uniqueTenants.map(tenant => (
                      <SelectItem key={tenant} value={tenant}>
                        {tenant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        removeTag(tag);
                      } else {
                        addTag(tag);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={applyFilters}>Apply Filters</Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {dateFrom && (
            <Badge variant="secondary" className="flex items-center gap-1">
              From: {format(dateFrom, "MMM dd, yyyy")}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFrom(undefined)} />
            </Badge>
          )}
          {dateTo && (
            <Badge variant="secondary" className="flex items-center gap-1">
              To: {format(dateTo, "MMM dd, yyyy")}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setDateTo(undefined)} />
            </Badge>
          )}
          {selectedStatus !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {selectedStatus}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStatus("all")} />
            </Badge>
          )}
          {selectedProperty !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Property: {selectedProperty}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedProperty("all")} />
            </Badge>
          )}
          {selectedTenant !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Tenant: {selectedTenant}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedTenant("all")} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
