function imprimir() {
    window.print();
}

const ctx = document.getElementById('graficoAlertas');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      'Almoxarifado',
      'TI',
      'RH',
      'Produção 1',
      'Logística'
    ],
    datasets: [{
      label: 'Quantidade de Alertas',
      data: [5, 8, 3, 10, 6],
      backgroundColor: [
        '#ff4d4d',
        '#4d79ff',
        '#33cc33',
        '#ffcc00',
        '#9933ff'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});

fetch()