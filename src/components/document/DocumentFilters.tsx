
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  Tag,
  SortAsc,
  SortDesc
} from "lucide-react";
import { format } from "date-fns";

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onFiltersChange: (filters: any) => void;
  documents: any[];
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
  const [filters, setFilters] = useState({
    status: '',
    property: '',
    tenant: '',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    tags: [] as string[],
    sortBy: 'uploadDate',
    sortOrder: 'desc'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract unique values for filter options
  const statuses = [...new Set(documents.map(doc => doc.status))];
  const properties = [...new Set(documents.map(doc => doc.property))];
  const tenants = [...new Set(documents.map(doc => doc.tenant).filter(t => t !== 'N/A'))];
  const allTags = [...new Set(documents.flatMap(doc => doc.tags || []))];

  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      property: '',
      tenant: '',
      dateFrom: null,
      dateTo: null,
      tags: [],
      sortBy: 'uploadDate',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onSearchChange('');
    onCategoryChange('all');
  };

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      updateFilters({ tags: [...filters.tags, tag] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFilters({ tags: filters.tags.filter(tag => tag !== tagToRemove) });
  };

  const hasActiveFilters = 
    searchTerm || 
    selectedCategory !== 'all' || 
    filters.status || 
    filters.property || 
    filters.tenant || 
    filters.dateFrom || 
    filters.dateTo || 
    filters.tags.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search documents, properties, tenants, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={showAdvancedFilters ? "bg-blue-50 border-blue-200" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
              !
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property</label>
                <Select value={filters.property} onValueChange={(value) => updateFilters({ property: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All properties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All properties</SelectItem>
                    {properties.map(property => (
                      <SelectItem key={property} value={property}>
                        {property}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenant Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tenant</label>
                <Select value={filters.tenant} onValueChange={(value) => updateFilters({ tenant: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All tenants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All tenants</SelectItem>
                    {tenants.map(tenant => (
                      <SelectItem key={tenant} value={tenant}>
                        {tenant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <div className="flex gap-2">
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uploadDate">Upload Date</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateFilters({ 
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
                    })}
                  >
                    {filters.sortOrder === 'asc' ? 
                      <SortAsc className="h-4 w-4" /> : 
                      <SortDesc className="h-4 w-4" />
                    }
                  </Button>
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateFrom ? format(filters.dateFrom, "PPP") : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateFrom}
                        onSelect={(date) => updateFilters({ dateFrom: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateTo ? format(filters.dateTo, "PPP") : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateTo}
                        onSelect={(date) => updateFilters({ dateTo: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Tags</label>
                <div className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Tag className="mr-2 h-4 w-4" />
                        Add tag filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid grid-cols-2 gap-2">
                        {allTags.map(tag => (
                          <Button
                            key={tag}
                            variant="ghost"
                            size="sm"
                            onClick={() => addTag(tag)}
                            disabled={filters.tags.includes(tag)}
                            className="justify-start"
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  {filters.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {filters.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                          {tag}
                          <X 
                            className="ml-1 h-3 w-3" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="outline">
              Search: {searchTerm}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onSearchChange('')} />
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="outline">
              Category: {selectedCategory}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onCategoryChange('all')} />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="outline">
              Status: {filters.status}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ status: '' })} />
            </Badge>
          )}
          {filters.property && (
            <Badge variant="outline">
              Property: {filters.property}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ property: '' })} />
            </Badge>
          )}
          {filters.tenant && (
            <Badge variant="outline">
              Tenant: {filters.tenant}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ tenant: '' })} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
