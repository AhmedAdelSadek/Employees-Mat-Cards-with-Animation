import { Component, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IEmployee } from "src/app/interfaces/IEmployee";
import { ImportService } from "src/app/services/import.service";

@Component({
  selector: "teamCard",
  templateUrl: "./teamCard.component.html",
  styleUrls: ["./teamCard.component.scss"],
})
export class TeamCardComponent implements OnDestroy {
  private _unsubscribe: Subject<any>;
  obs: Observable<IEmployee[]>;
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employees: IEmployee[] = [];
  constructor (private importService: ImportService) {
    this._unsubscribe = new Subject();
    this.loadData();
  }

  loadData() {
    this.importService
      .getData()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((employees: IEmployee[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<IEmployee>(this.employees);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
    this.dataSource.disconnect();
  }
}
