'use strict';

import { tokenHandling } from '../../atoms/token/token';

import LoadingBtn from '../../atoms/loading-btn/loading-btn';
import CustomSelect from '../../atoms/custom-select/custom-select';
import TypeSelect from '../../atoms/type-select/type-select';
import ListingBase from '../../organisms/listing-base/listing-base';
import Modal from '../../molecules/modal/modal';


export default class AuditListing {
  constructor() {

    //Define variables ========================================================

    let $module = $('.audit-listing'),
      _this = this

    this.$module = $module
    this.$typeSelects = $('.listing-filters .type-select', $module)

    this.$exportModal = $('.audit-modal')
    this.$exportTypeSelects = $('.type-select', this.$exportModal)
    //AJAX message
    this.$exportModalMessage = $('.modal--form__message', this.$exportModal)
    //Export btn in modal
    this.$modalExportBtn = $('.audit-listing__modal-export-btn', this.$exportModal)

    this.$listingFiltersForm = $('.listing-filters form', $module)

    //Copy values from listing filters to modal fields
    this.$fieldsToCopy = $('select[name], input[name]', this.$listingFiltersForm)

    this.fetchFileEndpoint = this.$exportModal.data('file-endpoint')


    //Modules =================================================================

    //TypeSelect
    this.TypeSelects = this.$typeSelects.map(this.mapTypeSelect(this.$typeSelects.length)).toArray()


    //Listing Base

    let config = {
      fetchEndpoint: $module.data('get-endpoint'),
      listingTemplate: '#audit-listing-template',
      itemsPerPage: parseInt($module.data('items-per-page'), 10),
      $listingContainer: $('.table-listing__results', $module),
      errorMessage: 'No audit logs were found',
      $spinner: $('.spinner', $module),
      $modules: {
        $listingFilters: $('.listing-filters', $module),
        $paginationBtnWrapper: $('.pagination .pagination__buttons-wrapper', $module),
        $paginationJumpForm: $('.pagination .pagination__jump-form', $module),
        $sortable: $('.table-listing[data-sortby]', $module)
      },
      methods: {
        beforeFetch: this.beforeFetch.bind(this),
        onSuccess: this.onLoadComplete.bind(this),
        onMessage: this.onLoadComplete.bind(this),
        onFailure: this.onLoadComplete.bind(this),
        throwEmptyMessage: this.throwEmptyListingMessage
      }
    };

    this.ListingBase = new ListingBase(config)


    //Export modal ============================================================

    //Instantiate Modal
    let modalArgs = [
      this.$exportModal,
      {
        keepOpenOnNonClose: true,
        onModalBtnClick: this.onModalBtnClick.bind(this),
        onTrigger: this.onModalTrigger.bind(this),
        afterClose: this.afterModalClose.bind(this),
        successMessageDuration: 10000,
        preventModalFormSubmission: true
      }
    ]

    this.ExportModal = new Modal(...modalArgs)

    //Instantiate Type-Select
    this.ExportTypeSelects = this.$exportTypeSelects.map(this.mapTypeSelect(this.$exportTypeSelects.length)).toArray()


    //Instantiate Custom-Select
    this.ExportCustomSelects = {}

    $('.custom-select', this.$exportModal).each(function () {
      let CustomSelectInstance = new CustomSelect($(this)),
        name = CustomSelectInstance.name

      _this.ExportCustomSelects[name] = CustomSelectInstance
    })

    //Loading btn
    this.LoadingBtn = new LoadingBtn(this.$modalExportBtn)

    //Clear modal message on form fields change
    $('input, select', this.$exportModal).on('change', function () {
      _this.ExportModal.setModalMessage('clear')
    })
  }

  mapTypeSelect(length) {

    return function (index) {
      let ajaxEndpoint = $(this).data('suggestion-endpoint')

      let autocompleteData = {
        serviceUrl: ajaxEndpoint,
        dataType: 'json',
        paramName: 'Query',
        transformResult({ Suggestions }) {
          let suggestions = Suggestions && Array.isArray(Suggestions) ? Suggestions : [];
          return { suggestions }
        }
      }

      let zIndex = length - index;

      return new TypeSelect($(this), autocompleteData, {}, zIndex)
    }
  }

  //Override in listing base due to table markup
  throwEmptyListingMessage($parentNode, errorMessage) {
    $parentNode.html(`<tr class="listing__empty-error"><td colspan="20">${errorMessage}</td></tr>`);
  }

  onModalTrigger(Modal) {
    let _this = this;

    //load modal form with listing filters form values
    //Note: mapping based on 'name' attribute
    this.$fieldsToCopy.each(function () {
      let $this = $(this),
        name = $this.prop('name'),
        value = $this.val()

      if ($this.is('input')) {

        $(`input[name="${name}"]`, _this.$exportModal).val(value)

      } else if ($this.is('select')) {

        _this.ExportCustomSelects[name].setValue(value)
      }
    })
  }

  onModalBtnClick(Modal, modalName, $btn, isClose) {
    if (!isClose) {
      let $form = $btn.closest('.modal').find('form'),
        serializedForm = $form.serializeArray()

      //Format to name:value
      let objRequest = serializedForm.reduce((reqObj, field) => {

        return { ...reqObj, [field.name]: field.value }
      }, {})

      //Trigger download
      this.fetchExportFile(objRequest)
    }

  }

  afterModalClose(Modal) {
    //Clear text
    this.ExportModal.setModalMessage('clear')
  }

  fetchExportFile(request) {

    let _this = this;
    // console.log('check export using these params', request)

    //Disable export btn
    this.LoadingBtn.onLoading()

    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      statusCode: tokenHandling,
      url: this.fetchFileEndpoint,
      data: JSON.stringify(request)
    })
      .done(function (response) {
        let { Message, FileUrl } = response;

        if (FileUrl) {
          //Success
          _this.ExportModal.setModalMessage('success', Message || 'File download in progress...')

          //File download should start
          window.location = FileUrl

        } else {

          //Error message from backend
          _this.ExportModal.setModalMessage('failure', Message || 'Error, could not download file.')
        }

        //Enable button
        _this.LoadingBtn.onLoadComplete()

      }).fail(function (err) {
        console.log(err);

        //Server down
        _this.ExportModal.setModalMessage('failure', 'Something went wrong, please try again later.')

        //Enable button
        _this.LoadingBtn.onLoadComplete()
      });
  }



  beforeFetch() {
    $('.table-listing__table', this.$module).fadeOut(0)
  }
  onLoadComplete() {
    $('.table-listing__table', this.$module).fadeIn()
  }
}
