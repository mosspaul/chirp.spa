import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Sidebar, RouterOutlet],
})
export class Home {
  authenticated: Boolean = false;
}
