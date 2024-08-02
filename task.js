document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.has-tooltip');

    tooltips.forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault();

            // Скрыть все активные подсказки перед показом новой
            const activeTooltips = document.querySelectorAll('.tooltip_active');
            activeTooltips.forEach(function(tooltip) {
                tooltip.classList.remove('tooltip_active');
            });

            // Создаем и добавляем элемент подсказки
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip', 'tooltip_active');
            tooltip.innerText = element.getAttribute('title');
            document.body.appendChild(tooltip);

            // Устанавливаем позицию подсказки
            const position = element.getAttribute('data-position') || 'top';
            setPosition(tooltip, element, position);
        });
    });

    function setPosition(tooltip, element, position) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        switch (position) {
            case 'top':
                tooltip.style.top = (rect.top - tooltipRect.height) + 'px';
                tooltip.style.left = (rect.left + (rect.width - tooltipRect.width) / 2) + 'px';
                break;
            case 'left':
                tooltip.style.top = (rect.top + (rect.height - tooltipRect.height) / 2) + 'px';
                tooltip.style.left = (rect.left - tooltipRect.width) + 'px';
                break;
            case 'right':
                tooltip.style.top = (rect.top + (rect.height - tooltipRect.height) / 2) + 'px';
                tooltip.style.left = (rect.right) + 'px';
                break;
            case 'bottom':
                tooltip.style.top = (rect.bottom) + 'px';
                tooltip.style.left = (rect.left + (rect.width - tooltipRect.width) / 2) + 'px';
                break;
            default:
                break;
        }
    }

    // Обработка клика вне подсказки для ее закрытия
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('has-tooltip')) {
            const activeTooltips = document.querySelectorAll('.tooltip_active');
            activeTooltips.forEach(function(tooltip) {
                tooltip.classList.remove('tooltip_active');
                tooltip.remove();
            });
        }
    });
});
