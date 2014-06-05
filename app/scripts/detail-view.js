"use strict";

var DetailView = Backbone.View.extend({

  className: 'detail-view',

  template: _.template($('.detail-view-template').text()),

  events: {
    "click .save-button": "updateModel",
    "click .new-button": "createPhoto"
  },

  initialize: function(){
    this.listenTo(photos, 'add', function(photo){
      new ThumbnailView({model: photo})
    })

    this.listenTo(this.model, 'change', this.render);

    $('.detail-container').append(this.el);
    this.render();
  },

  render: function(){

    var renderedTemplate = this.template(this.model.attributes);
    this.$el.html(renderedTemplate)
    return this;
  },

  updateModel: function(){

    var that = this;

    this.model.set({
      url:      this.$el.find('.url-input').val(),
      caption:  this.$el.find('.caption-input').val()
    });

    photos.add(this.model)

    this.model.save().done(function(){
      that.$el.find('.status').html('Saved!')
    })
  },

  createPhoto: function(){

    var photoInstance = new Photo();

    this.model = photoInstance

    this.$el.find('input').val('');
    this.$el.find('img').attr('src',' http://placehold.it/350x400');

  }
})