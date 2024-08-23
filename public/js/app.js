$(function() {
    // Model
    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        }
    });

    // Collection
    var TodoList = Backbone.Collection.extend({
        model: Todo
    });

    var Todos = new TodoList();

    // View for a single todo
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template('<%- title %>'),
        events: {
            'click': 'toggleCompleted'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleCompleted: function() {
            this.model.set('completed', !this.model.get('completed'));
        }
    });

    // View for the list of todos
    var AppView = Backbone.View.extend({
        el: '#todo-app',
        events: {
            'keypress #new-todo': 'createOnEnter'
        },
        initialize: function() {
            this.input = this.$('#new-todo');
            this.listenTo(Todos, 'add', this.addOne);
        },
        render: function() {
            // Optionally, you can add rendering logic here
        },
        addOne: function(todo) {
            var view = new TodoView({ model: todo });
            this.$('#todo-list').append(view.render().el);
        },
        createOnEnter: function(e) {
            if (e.which === 13 && this.input.val().trim()) {
                Todos.add(new Todo({
                    title: this.input.val().trim()
                }));
                this.input.val('');
            }
        }
    });

    var App = new AppView();
});
