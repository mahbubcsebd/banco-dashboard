'use client';

import ActionGrid from '@/components/landing/ActionGrid';
import RechargeForm from '@/components/mobile-recharge/RechargeForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, FilePlus, Trash2 } from 'lucide-react';

export default function MobileTopUpPage() {
  const actions = [
    {
      title: 'Add',
      icon: FilePlus,
      href: '/dashboard/mobile-manage',
    },
    {
      title: 'Edit',
      icon: Edit,
      href: '/dashboard/mobile-manage',
    },
    {
      title: 'Delete',
      icon: Trash2,
      href: '/dashboard/mobile-manage',
    },
  ];

  return (
    <div className="">
      <Tabs defaultValue="topup" className="w-full">
        <TabsList className="w-full bg-white border-0 border-gray-200 rounded-none h-auto p-0 shadow-none">
          <TabsTrigger
            value="topup"
            className="flex-1 py-4 text-base font-medium text-gray-600 border-0 border-b-2 border-transparent rounded-none shadow-none data-[state=active]:border-b-orange-500 data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=active]:bg-transparent"
          >
            Mobile Top-Up
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="flex-1 py-4 text-base font-medium text-gray-600 border-0 border-b-2 border-transparent rounded-none shadow-none data-[state=active]:border-b-orange-500 data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=active]:bg-transparent"
          >
            Manage Top-Up Payees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topup" className="mt-2">
          <RechargeForm />
        </TabsContent>

        <TabsContent value="manage" className="mt-2">
          <ActionGrid actions={actions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
