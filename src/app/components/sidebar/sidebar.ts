import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, ArrowLeftRight, Wallet, PieChart, Bell, Settings, Layers } from 'lucide-angular';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected userService = inject(UserService);
  readonly icons = {
    LayoutDashboard,
    ArrowLeftRight,
    Wallet,
    PieChart,
    Bell,
    Settings,
    Layers,
  };

  readonly username = computed(() => {
    const profile = this.userService.userProfile();
    return `${profile?.username}`.trim();
  });
}