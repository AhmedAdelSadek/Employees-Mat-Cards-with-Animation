import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeamCardComponent } from "./components/teamCard/TeamCard.component";

// Define the routes
const routes: Routes = [
  { path: "teamCard", component: TeamCardComponent },
  { path: "", redirectTo: "teamCard", pathMatch: "full" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
