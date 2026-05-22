'use client';

import { CreditCard, Banknote, Building2, Check, Clock, X } from 'lucide-react';

const METHOD_ICONS = { 'Credit Card': CreditCard, 'Cash': Banknote, 'Bank Transfer': Building2 };
const STATUS_STYLES = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
};

export default function PaymentCard({ payment }) {
  const Icon = METHOD_ICONS[payment.method] || CreditCard;
  const statusCls = STATUS_STYLES[payment.status] || STATUS_STYLES.pending;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm">{payment.guest}</p>
        <p className="text-xs text-gray-400">{payment.reference} · {payment.date}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">${payment.amount}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusCls}`}>
          {payment.status}
        </span>
      </div>
    </div>
  );
}
