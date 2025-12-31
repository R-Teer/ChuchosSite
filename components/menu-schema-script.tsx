'use client';

import { MenuItem, generateMenuSchema } from '@/lib/menu-schema';

export function MenuSchemaScript({ menuItems }: { menuItems: MenuItem[] }) {
  const schema = generateMenuSchema(menuItems);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
