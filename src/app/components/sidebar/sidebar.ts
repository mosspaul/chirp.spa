import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, ArrowLeftRight, Wallet, PieChart, Bell, Settings, Layers } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly icons = {
    LayoutDashboard,
    ArrowLeftRight,
    Wallet,
    PieChart,
    Bell,
    Settings,
    Layers,
  };
}