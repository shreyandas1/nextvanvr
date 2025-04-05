import * as React from 'react';
import axios from 'axios';

import { SearchForm } from '@/components/search-form';
import { VersionSwitcher } from '@/components/version-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { useScroll } from '@react-three/drei';

export function AppSidebar({ data, ...props }) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.map((item) => (
					<SidebarGroup key={item}>
						<SidebarGroupLabel>{item}</SidebarGroupLabel>
						<SidebarGroupContent>{item}</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
