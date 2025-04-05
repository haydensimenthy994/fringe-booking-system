import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PaymentPage() {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setMessage('Payment successful! Thank you for your purchase.');
      setCardName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setAmount('');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">
      <header className="fixed z-50 w-full border-b border-white/10 bg-[#0d0f1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src={logo || '/placeholder.svg'}
              alt="Adelaide Fringe Logo"
              className="h-8"
            />
          </div>
          <nav className="hidden items-center space-x-8 text-sm md:flex">
            <Link to="/home" className="font-medium text-pink-500">
              HOME
            </Link>

            <Link to="/events" className="text-white/70 hover:text-white">
              EVENTS
            </Link>
          </nav>

          <Link to="/contact">
            <Button className="bg-transparent text-sm text-white/70 hover:text-white">
              CONTACT US
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 pt-28 pb-10">
        <Card className="w-full max-w-md bg-gray-900">
          <CardContent className="p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              Payment Details
            </h2>
            {message && (
              <p className="mb-6 text-center text-green-400">{message}</p>
            )}
            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label
                  htmlFor="cardName"
                  className="mb-1 block text-sm text-white"
                >
                  Cardholder Name
                </label>
                <Input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-md border border-gray-600 bg-[#1f2130] p-3 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="cardNumber"
                  className="mb-1 block text-sm text-white"
                >
                  Card Number
                </label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full rounded-md border border-gray-600 bg-[#1f2130] p-3 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="mb-1 block text-sm text-white"
                  >
                    Expiry Date
                  </label>
                  <Input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="w-full rounded-md border border-gray-600 bg-[#1f2130] p-3 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="mb-1 block text-sm text-white"
                  >
                    CVV
                  </label>
                  <Input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                    className="w-full rounded-md border border-gray-600 bg-[#1f2130] p-3 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="mb-1 block text-sm text-white"
                >
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-md border border-gray-600 bg-[#1f2130] p-3 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-600 focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
