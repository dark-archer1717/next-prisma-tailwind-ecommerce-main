'use client'

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import config from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { forwardRef } from 'react'

// Sample peripherals for each category
const categories = {
   Mice: [
      {
         title: 'Logitech G Pro X Superlight',
         href: '/mice/logitech-g-pro-x-superlight',
         description:
            'A wireless gaming mouse designed for precision and speed, ideal for competitive gamers.',
      },
      // More mice here
   ],
   Keyboards: [
      {
         title: 'Corsair K95 RGB Platinum',
         href: '/keyboards/corsair-k95-rgb-platinum',
         description:
            'A mechanical keyboard with Cherry MX switches and dynamic multi-color lighting.',
      },
      // More keyboards here
   ],
   Headphones: [
      {
         title: 'SteelSeries Arctis 7',
         href: '/headphones/steelseries-arctis-7',
         description:
            'A wireless headset known for its comfort, battery life, and excellent sound quality.',
      },
      // More headphones here
   ],
   // Add more categories as needed
}

export function MainNav() {
   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center">
            <span className="hidden font-medium sm:inline-block">
               {config.name}
            </span>
         </Link>
         <NavMenu />
      </div>
   )
}

export function NavMenu() {
   return (
      <NavigationMenu>
         <NavigationMenuList>
            <NavigationMenuItem>
               <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     <div className="font-normal text-foreground/70">
                        Products
                     </div>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>

            {Object.entries(categories).map(([categoryName, items], index) => (
               <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>
                     <div className="font-normal text-foreground/70">
                        {categoryName}
                     </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="grid w-full gap-2 p-4 md:grid-cols-2 lg:w-[600px]">
                        {items.map((item) => (
                           <ListItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                           >
                              {item.description}
                           </ListItem>
                        ))}
                     </ul>
                  </NavigationMenuContent>
               </NavigationMenuItem>
            ))}
         </NavigationMenuList>
      </NavigationMenu>
   )
}

const ListItem = forwardRef<
   React.ElementRef<'a'>,
   React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
   return (
      <li>
         <NavigationMenuLink asChild>
            <Link
               href={href}
               ref={ref}
               className={cn(
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  className
               )}
               {...props}
            >
               <div className="text-sm font-medium leading-none">{title}</div>
               <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
               </p>
            </Link>
         </NavigationMenuLink>
      </li>
   )
})

ListItem.displayName = 'ListItem'
