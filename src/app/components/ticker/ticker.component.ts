import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  selectedPair = "BTC-INR";
  selectedPartner = "zebpay";
  interval = 3;
  listItems: Item[] = [];

  pairs: string[] = [];

  partners = [
    { id: "zebpay", name: "Zebpay" }
  ];

  targetCurrencies = ["INR", "EUR", "AUD", "SGD", "USDT", "BTC"];

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {

    this.dataService.getData(this.selectedPartner)
    .subscribe(response => {
      var res = <any[]>response;
      res.forEach(data => {
        this.pairs.push(data['pair']);
      });

      this.pairs.sort();

      this.startTimer();
    });

  }

  lastBuyPrice = 0.0;
  lastSellPrice = 0.0;

  loadData() {

    this.dataService.getData(this.selectedPartner)
      .subscribe(response => {
        var res = <any[]>response;
        res.forEach(data => {
          if (data['pair'] === this.selectedPair) {
            var buyPrice = parseFloat(data['buy']);
            var sellPrice = parseFloat(data['sell']);

            var currency = data['currency'];

            this.listItems.push({
              buyPrice: this.getFormatted(buyPrice, currency),
              sellPrice: this.getFormatted(sellPrice, currency),
              bpStatus: this.getStatus(buyPrice, this.lastBuyPrice),
              spStatus: this.getStatus(sellPrice, this.lastSellPrice),
              time: this.getCurrentTime()
            });

            this.lastBuyPrice = buyPrice;
            this.lastSellPrice = sellPrice;

            this.scrollToBottom();
          }
        });
      });
  }

  getFormatted(value: number, currency: string) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2
    });
    
    return formatter.format(value);
  }

  getStatus(currentPrice: number, lastPrice: number) {
    if (lastPrice != 0) {
      if (currentPrice < lastPrice) {
        return "dec";
      } else if (currentPrice > lastPrice) {
        return "inc";
      }
    }
    return "nochange";
  }

  getPartnerName(partner: string) {
    for (var i = 0; i < this.partners.length; i++) {
      if (this.partners[i].id === partner) {
        return this.partners[i].name;
      }
    }
    return "";
  }

  getCurrentTime() {
    return new Date().toTimeString().split(' ')[0];
  }

  onChangeTimer() {
    console.log("Change Interval Called");
    this.pauseTimer();
    this.startTimer();
  }

  onPairChange() {
    console.log("Change Pair Called");
    this.lastBuyPrice = 0;
    this.lastSellPrice = 0;
    this.listItems = [];
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }

  timer: any;

  startTimer() {
    this.loadData();
    this.timer = setInterval(() => {
      this.loadData();
    }, 1000 * this.interval)
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

}

interface Item {
  buyPrice: string,
  sellPrice: string,
  bpStatus: string,
  spStatus: string,
  time: string
}