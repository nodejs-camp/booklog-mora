/**
 * SETUP
 **/
  var app = app || {};

/**
 * MODELS
 **/
app.Search = Backbone.Model.extend({
	url: function() {
		return 'http://localhost:3000/1/post/tag' + this.tag
	},
	tag: '',
	posts: [{
		       "_id": "",
		       "subject": ""
		   }]
});

app.Post = Backbone.Model.extend({
  url: function() {
  	return 'http://localhost:3000/1/post' + this.query
  },
  query : '',
  defaults: {
    success: false,
    errors: [],
    errfor: {},

	posts: [{
	       "content": "hello",
	       "_id": "5402de2f559097cdf139fff9",
	       "subject": "abc123"
	   }]
  }
});

/**
 * VIEWS
 **/
  app.SearchView = Backbone.View.extend({
    el: '#search-section', //elementID
    events: {
      'click .btn-search': 'performSearch'
    },
    //實例化model
    initialize: function() {
        this.model = new app.Search();
        //實例化的template在index.jade去增加underscope
        this.template = _.template($('#tmpl-results').html());

        this.model.bind('change', this.render, this);
    },
    render: function() {
        var data = this.template(this.model.attributes);

        this.$el.html(data);
        return this;
    },
    performSearch: function() {
    	var tag = this.$el.find('#search-tag').val();
    	alert(tag);
    	this.modal.tag = tag;
    	this.model.fetch();
    }
  });


  app.PostView = Backbone.View.extend({
  	el: '#blog-post',
    events: {
    	'click .btn-filter': 'performFilter'
    },
    initialize: function() {
        this.model = new app.Post();
        this.template = _.template($('#tmpl-post').html());

        this.model.bind('change', this.render, this);

        this.model.fetch();
    },
    render: function() {
        var data = this.template(this.model.attributes);

        this.$el.html(data);
        return this;
    },
     performFilter: function() {
        this.model.query = '?sort=date';
        this.model.fetch();
    }

  });

/**
 * BOOTUP
 **/
  $(document).ready(function() {
    app.postView = new app.PostView();
    app.searchView = new app.SearchView();
  });