import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { IEmployee } from "src/app/interfaces/IEmployee";

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  animations: [
    trigger("flipState", [
      state(
        "active",
        style({
          transform: "rotateY(179deg)",
        })
      ),
      state(
        "inactive",
        style({
          transform: "rotateY(0)",
        })
      ),
      transition("active => inactive", animate("500ms ease-out")),
      transition("inactive => active", animate("500ms ease-in")),
    ]),
  ],
})
export class CardComponent implements OnInit {
  flip: string = "inactive";
  private _member: IEmployee;
  @Input() set member(member: IEmployee) {
    this._member = member;
  }
  get member(): IEmployee {
    return this._member;
  }
  constructor() {}
  ngOnInit() {}
  toggleFlip() {
    this.flip = this.flip == "inactive" ? "active" : "inactive";
  }
  /**
   * Sends email
   * Click-Event for Email
   * @param member
   */
  handleEmailButtonClick(member: IEmployee) {
    window.location.href = `mailto:${member.email}`;
  }
  /**
   * Makes call
   * Click-Event for Phone
   * @param member
   */
  handleCallButtonClick(member: IEmployee) {
    window.location.href = `tel:${member.phone}`;
  }
  /**
   * Triggers Skype
   * Click-Event for Chat
   * @param member
   */
  handleChatButtonClick(member: IEmployee) {
    window.location.href = "skype:echo123?chat";
  }
}
