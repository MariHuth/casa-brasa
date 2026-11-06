/* Casa Brasa: comportamento do site. Fica em arquivo separado (boa prática de segurança). */
(function () {
  'use strict';

  // 1. CONFIGURAÇÃO: número FICTÍCIO. Troque pelo número real (DDI + DDD + número, só dígitos).
  var NUMERO_WHATSAPP = '5500900000000';

  // Avisa o CSS que o JavaScript está funcionando
  document.documentElement.classList.add('js');

  // 2. Menu hambúrguer (celular)
  var botaoMenu = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu');
  botaoMenu.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
    }
  });

  // 3. Filtro do cardápio
  var filtros = document.querySelectorAll('.filtro');
  var itens = document.querySelectorAll('.item');
  filtros.forEach(function (botao) {
    botao.addEventListener('click', function () {
      var escolhido = botao.dataset.filtro;
      filtros.forEach(function (b) {
        var ativo = b === botao;
        b.classList.toggle('ativo', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
      itens.forEach(function (item) {
        item.hidden = !(escolhido === 'todos' || item.dataset.categoria === escolhido);
      });
    });
  });

  // 4. Links do WhatsApp: monta o endereço com a mensagem de cada botão
  document.querySelectorAll('[data-whats]').forEach(function (link) {
    var mensagem = encodeURIComponent(link.dataset.whats); // codifica acentos e espaços com segurança
    link.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + mensagem;
    link.target = '_blank';
    link.rel = 'noopener noreferrer'; // segurança ao abrir link externo
  });

  // 5. Ano atual no rodapé
  document.getElementById('ano').textContent = new Date().getFullYear();
})();
