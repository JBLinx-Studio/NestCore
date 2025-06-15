
import { X } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: string[];
  recentSearches: string[];
  onSelectSuggestion: (suggestion: string) => void;
  onRemoveRecentSearch: (index: number) => void;
}

export const SearchSuggestions = ({
  suggestions,
  recentSearches,
  onSelectSuggestion,
  onRemoveRecentSearch
}: SearchSuggestionsProps) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
      {suggestions.length > 0 && (
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2">Suggestions</div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      {recentSearches.length > 0 && (
        <div className="p-2 border-t">
          <div className="text-xs text-gray-500 mb-2">Recent searches</div>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
              onClick={() => onSelectSuggestion(search)}
            >
              <span>{search}</span>
              <X 
                className="h-3 w-3 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveRecentSearch(index);
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
