
import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { Document } from "./types";
import { SearchSuggestions } from "./search/SearchSuggestions";

interface DocumentSearchProps {
  documents: Document[];
  onSearchResults: (results: Document[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const DocumentSearch = ({ 
  documents, 
  onSearchResults, 
  searchTerm, 
  onSearchChange 
}: DocumentSearchProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    
    const suggestions = new Set<string>();
    
    documents.forEach(doc => {
      // Add document names that match
      if (doc.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(doc.name);
      }
      
      // Add properties that match
      if (doc.property.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(doc.property);
      }
      
      // Add tags that match
      doc.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(tag);
        }
      });
      
      // Add categories that match
      if (doc.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(doc.category);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm, documents]);

  const handleSearch = useCallback((term: string) => {
    onSearchChange(term);
    
    if (term.trim()) {
      setRecentSearches(prev => {
        const updated = [term, ...prev.filter(s => s !== term)].slice(0, 5);
        return updated;
      });
    }
    
    const results = documents.filter(doc => {
      const searchLower = term.toLowerCase();
      return (
        doc.name.toLowerCase().includes(searchLower) ||
        doc.property.toLowerCase().includes(searchLower) ||
        doc.tenant.toLowerCase().includes(searchLower) ||
        doc.category.toLowerCase().includes(searchLower) ||
        doc.status.toLowerCase().includes(searchLower) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });
    
    onSearchResults(results);
    setShowSuggestions(false);
  }, [documents, onSearchChange, onSearchResults]);

  const clearSearch = useCallback(() => {
    onSearchChange("");
    onSearchResults(documents);
    setShowSuggestions(false);
  }, [onSearchChange, onSearchResults, documents]);

  const removeRecentSearch = useCallback((index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documents, properties, tenants..."
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchTerm);
            }
            if (e.key === 'Escape') {
              setShowSuggestions(false);
            }
          }}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search suggestions dropdown */}
      {showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
        <SearchSuggestions
          suggestions={searchSuggestions}
          recentSearches={recentSearches}
          onSelectSuggestion={handleSearch}
          onRemoveRecentSearch={removeRecentSearch}
        />
      )}

      {/* Active search filters */}
      {searchTerm && (
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Search: "{searchTerm}"
            <X 
              className="h-3 w-3 cursor-pointer hover:text-red-500"
              onClick={clearSearch}
            />
          </Badge>
        </div>
      )}
    </div>
  );
};
