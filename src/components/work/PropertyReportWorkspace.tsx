
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Building, MapPin, Download, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";

export const PropertyReportWorkspace = () => {
  const [propertyData, setPropertyData] = useState({
    // Property Information
    schemeName: "SHALOM",
    address: "Berg Street, Bothasrus",
    suburb: "Bothasrus",
    municipality: "Nelson Mandela Bay",
    province: "Eastern Cape",
    type: "Residence",
    usage: "Residence",
    
    // Property Details
    schemeNumber: "468/1993",
    sectionNumber: "4",
    flatNumber: "",
    sectionExtent: "112",
    gps: "25.456715°E 33.804439°S",
    
    // Municipal Valuation
    totalValue: 690000,
    valuationYear: 2022,
    
    // Accommodation Details
    condition: "Avg",
    bedRooms: "",
    bathRooms: "",
    study: "",
    receptionRooms: "",
    enSuite: "",
    domesticAccom: "",
    levy: "",
    alarm: "",
    pool: "",
    garages: "",
    storeroom: "",
    perimSecurity: "",
    exclusiveArea: "",
    baysPortions: ""
  });

  const [specialFeatures, setSpecialFeatures] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const generateFullReport = () => {
    toast.success("Generating complete property report...");
  };

  const printReport = () => {
    toast.success("Preparing report for printing...");
  };

  const shareReport = () => {
    toast.success("Sharing property report...");
  };

  return (
    <div className="space-y-6">
      {/* Property Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Property Information</span>
          </CardTitle>
          <CardDescription>Basic property identification and location details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="scheme-name">Scheme Name</Label>
              <Input
                id="scheme-name"
                value={propertyData.schemeName}
                onChange={(e) => setPropertyData({...propertyData, schemeName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={propertyData.address}
                onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="suburb">Suburb</Label>
              <Input
                id="suburb"
                value={propertyData.suburb}
                onChange={(e) => setPropertyData({...propertyData, suburb: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="municipality">Municipality</Label>
              <Input
                id="municipality"
                value={propertyData.municipality}
                onChange={(e) => setPropertyData({...propertyData, municipality: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                value={propertyData.province}
                onChange={(e) => setPropertyData({...propertyData, province: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={propertyData.type}
                onChange={(e) => setPropertyData({...propertyData, type: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Property Details</span>
          </CardTitle>
          <CardDescription>Detailed property specifications and measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="scheme-number">Scheme Number</Label>
              <Input
                id="scheme-number"
                value={propertyData.schemeNumber}
                onChange={(e) => setPropertyData({...propertyData, schemeNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="section-number">Section Number</Label>
              <Input
                id="section-number"
                value={propertyData.sectionNumber}
                onChange={(e) => setPropertyData({...propertyData, sectionNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="flat-number">Flat Number</Label>
              <Input
                id="flat-number"
                value={propertyData.flatNumber}
                onChange={(e) => setPropertyData({...propertyData, flatNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="section-extent">Section Extent (m²)</Label>
              <Input
                id="section-extent"
                value={propertyData.sectionExtent}
                onChange={(e) => setPropertyData({...propertyData, sectionExtent: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="gps">GPS Coordinates</Label>
              <Input
                id="gps"
                value={propertyData.gps}
                onChange={(e) => setPropertyData({...propertyData, gps: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Municipal Valuation */}
      <Card>
        <CardHeader>
          <CardTitle>Municipal Valuation</CardTitle>
          <CardDescription>Official municipal property valuation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-value">Total Value (R)</Label>
              <Input
                id="total-value"
                type="number"
                value={propertyData.totalValue}
                onChange={(e) => setPropertyData({...propertyData, totalValue: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="valuation-year">Valuation Year</Label>
              <Input
                id="valuation-year"
                type="number"
                value={propertyData.valuationYear}
                onChange={(e) => setPropertyData({...propertyData, valuationYear: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                R {propertyData.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Municipal Valuation {propertyData.valuationYear}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accommodation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Accommodation</CardTitle>
          <CardDescription>Property features and amenities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={propertyData.condition}
                onChange={(e) => setPropertyData({...propertyData, condition: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="bed-rooms">Bed Rooms</Label>
              <Input
                id="bed-rooms"
                value={propertyData.bedRooms}
                onChange={(e) => setPropertyData({...propertyData, bedRooms: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="bath-rooms">Bath Rooms</Label>
              <Input
                id="bath-rooms"
                value={propertyData.bathRooms}
                onChange={(e) => setPropertyData({...propertyData, bathRooms: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="study">Study</Label>
              <Input
                id="study"
                value={propertyData.study}
                onChange={(e) => setPropertyData({...propertyData, study: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="reception-rooms">Reception Rooms</Label>
              <Input
                id="reception-rooms"
                value={propertyData.receptionRooms}
                onChange={(e) => setPropertyData({...propertyData, receptionRooms: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="en-suite">En Suite</Label>
              <Input
                id="en-suite"
                value={propertyData.enSuite}
                onChange={(e) => setPropertyData({...propertyData, enSuite: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="levy">Levy</Label>
              <Input
                id="levy"
                value={propertyData.levy}
                onChange={(e) => setPropertyData({...propertyData, levy: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="alarm">Alarm</Label>
              <Input
                id="alarm"
                value={propertyData.alarm}
                onChange={(e) => setPropertyData({...propertyData, alarm: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="pool">Pool</Label>
              <Input
                id="pool"
                value={propertyData.pool}
                onChange={(e) => setPropertyData({...propertyData, pool: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="garages">Garages</Label>
              <Input
                id="garages"
                value={propertyData.garages}
                onChange={(e) => setPropertyData({...propertyData, garages: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="storeroom">Storeroom</Label>
              <Input
                id="storeroom"
                value={propertyData.storeroom}
                onChange={(e) => setPropertyData({...propertyData, storeroom: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="perim-security">Perimeter Security</Label>
              <Input
                id="perim-security"
                value={propertyData.perimSecurity}
                onChange={(e) => setPropertyData({...propertyData, perimSecurity: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Features */}
      <Card>
        <CardHeader>
          <CardTitle>Special Features</CardTitle>
          <CardDescription>Additional property features and notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="special-features">Special Features</Label>
              <Textarea
                id="special-features"
                placeholder="List any special features, unique aspects, or notable characteristics of the property..."
                value={specialFeatures}
                onChange={(e) => setSpecialFeatures(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="additional-notes">Additional Notes</Label>
              <Textarea
                id="additional-notes"
                placeholder="Add any additional observations, recommendations, or important information..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Export and share property reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateFullReport} className="bg-gradient-to-r from-blue-500 to-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Generate Full Report
            </Button>
            <Button onClick={printReport} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button onClick={shareReport} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Property summary coming soon...")}>
              <Download className="h-4 w-4 mr-2" />
              Quick Summary
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">Report Preview</div>
                <div className="text-sm text-blue-700 mt-1">
                  Property Report for {propertyData.schemeName}, {propertyData.address} - 
                  Municipal valuation: R {propertyData.totalValue.toLocaleString()} ({propertyData.valuationYear})
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
