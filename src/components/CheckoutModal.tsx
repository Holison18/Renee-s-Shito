import { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "./ProductCard";
import jsPDF from "jspdf";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

interface CustomerInfo {
  email: string;
  contact: string;
  address: string;
}

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: CheckoutModalProps) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    contact: "",
    address: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [includeDeliveryFee, setIncludeDeliveryFee] = useState(false);

  if (!isOpen) return null;

  const baseTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalAmount = includeDeliveryFee ? baseTotal + 13 : baseTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return customerInfo.email.trim() !== "" && 
           customerInfo.contact.trim() !== "" && 
           customerInfo.address.trim() !== "";
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text("Renee's Special Shito - Order Receipt", 20, 30);
    
    pdf.setFontSize(12);
    pdf.text("Customer Information:", 20, 50);
    pdf.text(`Email: ${customerInfo.email}`, 20, 60);
    pdf.text(`Contact: ${customerInfo.contact}`, 20, 70);
    pdf.text(`Address: ${customerInfo.address}`, 20, 80);
    
    pdf.text("Order Items:", 20, 100);
    let yPosition = 110;
    
    cartItems.forEach((item) => {
      const itemText = `${item.product.name} x ${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`;
      pdf.text(itemText, 20, yPosition);
      yPosition += 10;
    });
    
    pdf.setFontSize(14);
    pdf.text(`Total: $${totalAmount.toFixed(2)}`, 20, yPosition + 10);
    
    return pdf;
  };

  const handleConfirm = () => {
    if (!validateForm()) {
      alert("Please fill in all fields");
      return;
    }
    
    generatePDF();
    setShowConfirmation(true);
  };

  const createWhatsAppMessage = () => {
    let message = "*New Order*\n\n";
    message += "*Order Details:*\n";
    
    cartItems.forEach((item) => {
      message += `• ${item.product.name} x ${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total: $${totalAmount.toFixed(2)}*\n\n`;
    message += "*Customer Information:*\n";
    message += `Customer Email: ${customerInfo.email}\n`;
    message += `Customer Contact: ${customerInfo.contact}\n`;
    message += `Delivery ddress: ${customerInfo.address}\n\n`;

    if (includeDeliveryFee) {
      message += "*Delivery Fee: $13 (Interstate Delivery Paid)*\n\n";
    }
    
    message += "Please attach your payment screenshots to this message to validate your order.";
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = createWhatsAppMessage();
    const whatsappUrl = `http://wa.me/233503986624?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (showConfirmation) {
    const nbText = "Interstate delivery fee is 13 dollars and hence if the customer wants their product delivered to them, they should add the delivery fee. Also, payment validates orders. User should use the details there to make the payment and click on the button to send screenshots of payments to Renee to validate order.";

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl bg-card">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center">Payment</h2>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-semibold text-yellow-800">NB:</p>
              <p className="text-yellow-800">{nbText}</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <div className="border border-gray-200 rounded-lg p-4 w-1/2 flex flex-col items-center">
                <img src="\src\assets\cashapp-logo.jpg" alt="CashApp" className="h-12 mb-2" />
                <p className="text-center">Contact for payment: +1 (603) 824-5465</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 w-1/2 flex flex-col items-center">
                <img src="\src\assets\zelle-Symbol.jpg" alt="Zelle" className="h-12 mb-2" />
                <p className="text-center">Contact for payment: +1 (603) 824-5465</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-semibold text-foreground">Contact: +1 (603) 824-9565</p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppOrder} 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Send Order via WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowConfirmation(false);
                  onClose();
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 border border-accent rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                      <p className="text-primary font-bold">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="h-8 w-8 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeDeliveryFee}
                    onChange={(e) => setIncludeDeliveryFee(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-foreground">Add $13 Interstate Delivery Fee</span>
                </label>
                {includeDeliveryFee && (
                  <p className="text-sm text-muted-foreground ml-6">Delivery fee of $13 will be added to your total.</p>
                )}
              </div>

              <div className="border-t border-accent pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-foreground">Delivery Information</h3>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    name="contact"
                    value={customerInfo.contact}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full delivery address"
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                onClick={handleConfirm} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
                disabled={!validateForm()}
              >
                Confirm Order
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutModal;