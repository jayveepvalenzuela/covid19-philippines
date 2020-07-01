import { Case } from './case.js';

const caseAPI = new Case();
const casesTableBody = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.btn-load-more');
const selectShowRows = document.querySelector('.select-show-rows');
let page = 1;
let items = 50;

const getCaseList = function() {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    caseAPI.getList(page, items).then(function(data) {
        const { data: list, total } = data.data;

        casesTableBody.insertAdjacentHTML('beforeend', generateTableRow(list));
        casesTotal.innerText = `${casesTableBody.childElementCount.toLocaleString()} of ${total.toLocaleString()}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
}

const generateTableRow = function(data) {
    let html = '';

    data.forEach(e => {
        html += `<tr>
                    <td>${e.case_no}</td>
                    <td><span class="badge badge--${e.health_status.toLowerCase()}">${e.health_status}</span></td>
                    <td>${e.age}</td>
                    <td>${e.sex}</td>
                    <td>${e.location}</td>
                    <td>${e.travel_history}</td>
                    <td>${e.hospital_admitted_to}</td>
                    <td>${e.date_of_announcement_to_public}</td>
                 </tr>`;
    });

    return html;
}

btnLoadMore.addEventListener('click', function() {
    getCaseList();
});

selectShowRows.addEventListener('change', function(e) {
    casesTableBody.innerHTML = '';
    page = 1;
    items = e.target.value;

    getCaseList();
});

getCaseList();
