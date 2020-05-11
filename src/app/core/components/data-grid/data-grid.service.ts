export class DataGridService {
  public isSelectionEnabled = false;

  public toggleSelectionMode(): void {
    this.isSelectionEnabled = !this.isSelectionEnabled;
  }
}
